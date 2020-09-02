#This is the way I get a multilayer docker image with a war applicaton.
#First open the war file to find out which folders have to be copied to the image:

#jar -xf youapp.war
#In my project the war file is composed of these folders:
#
#/WEB-INF
#/META-INF
#/resources
#/org
#Based on this, I created the following Dockerfile:

FROM openjdk:8-jdk-alpine AS builder
WORKDIR target/dependency
ARG APPWAR=controller/target/*.war
COPY ${APPWAR} app.war
RUN jar -xf ./app.war
RUN mv WEB-INF/lib lib

FROM openjdk:8-jre-alpine
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY --from=builder ${DEPENDENCY}/lib /app/WEB-INF/lib
COPY --from=builder ${DEPENDENCY}/org /app/org
COPY --from=builder ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=builder ${DEPENDENCY}/WEB-INF /app/WEB-INF

EXPOSE 8080
ENTRYPOINT ["java","-XX:+UnlockExperimentalVMOptions","-XX:+UseCGroupMemoryLimitForHeap","-XX:MaxRAMFraction=1","-XshowSettings:vm","-cp","/app/WEB-INF/classes:/app/WEB-INF/lib/*","org.example.sensor.configuration.Application"]