
FROM node:20.5.1 AS ui_build
WORKDIR /build

# RUN npm install -g -s --no-progress yarn

COPY ./ui/package.json /build/package.json
COPY ./ui/package-lock.json /build/package-lock.json
RUN yarn install

COPY ./ui /build
RUN yarn build

FROM python:3.10-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app

RUN mkdir /code/static
COPY --from=ui_build /build/out /code/static

WORKDIR /code
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
