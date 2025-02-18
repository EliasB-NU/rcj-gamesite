FROM golang:1.23.5-alpine AS builder-go

WORKDIR /backend

COPY backend/go.mod backend/go.sum ./

RUN go mod download

COPY backend/main.go main.go

RUN go build main.go


FROM node:current-alpine AS builder-npm

WORKDIR /web

COPY / ./

RUN npm install

RUN npm run build


FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder-go /backend/main .

COPY --from=builder-npm /web/dist ./dist

EXPOSE 3000

CMD ["./main"]