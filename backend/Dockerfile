FROM alpine:latest

RUN apk add --no-cache python3-dev 
RUN apk add py3-pip 

WORKDIR /app

COPY . /app

RUN pip --no-cache-dir install -r requirements.txt

# for documentation porposes
EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["api.py"]

# RUN flask run



