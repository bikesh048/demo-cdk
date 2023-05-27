FROM public.ecr.aws/lambda/python:3.8

COPY . ./

RUN python3 -m pip install -r requirements.txt

EXPOSE 80

ENTRYPOINT ["python3","app.py"]
