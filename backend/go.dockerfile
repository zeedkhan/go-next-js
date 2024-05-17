FROM golang:1.16.3-alpine3.13

WORKDIR /app

COPY . .

# Download and install dependencies:
RUN go get -d -v ./...

# build the go app
RUN go build -o api .

EXPOSE 8080

CMD [ "./api" ]