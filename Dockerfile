FROM node:13.7.0 as builder

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN git clone https://github.com/erdnando/afiliacion2.0.git /opt/vue_app


WORKDIR /opt/vue_app
RUN npm install && npm run build


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.21.3

COPY --from=builder /opt/vue_app/openshift/nginx.conf /etc/nginx/nginx.conf



#Copy ci-dashboard-dist
COPY --from=builder /opt/vue_app/dist/ /usr/share/nginx/html/fintech/

#Copy images folder to root
RUN cp -R /usr/share/nginx/html/fintech/images /usr/share/nginx/html/images
#Copy facephi folder to root
RUN cp -R /usr/share/nginx/html/fintech/facephi /usr/share/nginx/html/facephi
#Add folder to container
COPY --from=builder /opt/vue_app/openshift/img /usr/share/nginx/html/img


#docker rmi image erdnando/front-fintech
#build
#docker build -t erdnando/front-fintech:latest .
#local test
#docker run -it -p 8080:80 --name web-vue erdnando/front-fintech
#push
#docker push erdnando/front-fintech:latest


EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]