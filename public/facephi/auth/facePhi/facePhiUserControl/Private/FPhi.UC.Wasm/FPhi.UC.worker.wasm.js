var Module={
	onRuntimeInitialized:function(){
		var a=new Module.ExtractorConfigurationManager;a.setImageQualityFilter(Module.ImageQualityFilter.Medium),a.setPatternQualityFilter(Module.PatternQualityFilter.Medium),
		a.setMinimumDistanceBetweenEyesAllowed(40),
		self.extractor=new Module.Extractor(a),a.delete(),
		a=new Module.ExtractorConfigurationManager,a.setImageQualityFilter(Module.ImageQualityFilter.Medium),a.setLivenessDetectionPrecision(Module.LivenessDetectionPrecision.Low),
		a.setPatternQualityFilter(Module.PatternQualityFilter.Medium),self.extractorLiveness=new Module.Extractor(a),a.delete(),self.livenessTimer=new Module.LivenessTimer,
		self.postMessage({cmd:"ready"})
	}
	};
	
	importScripts("FPhiExtractor.js");
var extractor,extractorLiveness,livenessTimer,lastExtractionResult;
self.onmessage=function(b){
						if("detect"==b.data.cmd){
							var c={cmd:"detect"},
							d=Module.Image.getFPhiImage(b.data.data,b.data.height,b.data.width,Module.ImageFormat.RGBA_32bpp),
							e=self.extractor.detect(d);
							if(e){
								var f=e.get(0);
								if(c.sampleDiagnostic=f.getSampleDiagnostic().value,f.getSampleDiagnostic()==Module.SampleDiagnostic.Ok){
								var g=f.getFace(),h=f.getLeftEye(),i=f.getRightEye();
								null!=g&&(c.face={x:g.X,y:g.Y,width:g.Width,height:g.Height}),null!=h&&(c.leftEye={x:h.X,y:h.Y}),
								null!=i&&(c.rightEye={x:i.X,y:i.Y})}
								f.delete()
							}
							d.delete(),e.delete(),postMessage(c)
						}
						else if("extractNextSmart"==b.data.cmd){
							var c={cmd:"extractNextSmart"},
							d=Module.Image.getFPhiImage(b.data.data,b.data.height,b.data.width,Module.ImageFormat.RGBA_32bpp),
							f=self.extractor.extractNextSmart(d);
							if(void 0!=self.lastExtractionResult&&self.lastExtractionResult.delete(),
							self.lastExtractionResult=f,c.sampleDiagnostic=f.getSampleDiagnostic().value,f.getSampleDiagnostic()==Module.SampleDiagnostic.Ok){
								var g=f.getFace(),h=f.getLeftEye(),i=f.getRightEye();
								null!=g&&(c.face={x:g.X,y:g.Y,width:g.Width,height:g.Height}),null!=h&&(c.leftEye={x:h.X,y:h.Y}),
								null!=i&&(c.rightEye={x:i.X,y:i.Y});
								var j=f.getTemplate(),k=Module.getBytes(j);
								c.template=new Uint8Array(k),j.delete();
								var l=f.getTemplateInfo();
								c.templateScore=l.getTemplateScore(),l.delete()
							}
							d.delete(),postMessage(c)
						}
						else if("initStreamExtraction"==b.data.cmd){
							
							console.log("realmente extrayendo...");
							if(self.extractor.stopStreamExtraction(),1==b.data.extractionMode){
								console.log("if");
								var m=Module.ExtractionMode.Register,n=new Module.ExtractionOptions;
								n.setExtractionMode(m),self.extractor.initStreamExtractionSmartWithExtractionOptions(n),n.delete()
								}
								else{
									console.log("else");
									var m=Module.ExtractionMode.Authenticate,n=new Module.ExtractionOptions;n.setExtractionMode(m),
									0==b.data.livenessMode?n.setLivenessTag(0):n.setLivenessTag(1),self.extractor.initStreamExtractionSmartWithExtractionOptions(n),n.delete()
								}
								
								var c={cmd:"initStreamExtraction"};
								console.log("postMessage...");
								postMessage(c)
						}
						else if("evaluateLiveness"==b.data.cmd){
							for(var d,c={cmd:"evaluateLiveness"},o=new Module.VectorImages,
								p=0;p<b.data.images.length;p++)
								d=Module.Image.getFPhiImage(b.data.images[p].pixels.data,b.data.images[p].height,b.data.images[p].width,Module.ImageFormat.RGBA_32bpp),o.push_back(d);
								for(var a=self.livenessTimer.evaluate(),j=self.lastExtractionResult.getTemplate(),
								q=self.extractorLiveness.evaluateLiveness(o,a,j),p=0;p<b.data.images.length;p++)o.get(p).delete();o.delete(),j.delete(),a.delete(),
								c.livenessDiagnostic=q.getLivenessDiagnostic().value,c.penalty=q.getPenalty(),q.delete(),postMessage(c)
						}
						else if("livenessTimerReset"==b.data.cmd)self.livenessTimer.reset(),postMessage({cmd:"livenessTimerReset"});
						else if("livenessTimerSetValues"==b.data.cmd)
							self.livenessTimer.setValues(b.data.timeLapse,b.data.fps),postMessage({cmd:"livenessTimerSetValues"});
						else if("livenessTimerAdd"==b.data.cmd){
							var r=self.livenessTimer.add(b.data.milliseconds),s=self.livenessTimer.isFull();s&&self.livenessTimer.evaluate();
							var c={cmd:"livenessTimerAdd",status:r,isFull:s};
							postMessage(c)
						}
						else postMessage({cmd:"unknownMessage"})
				};