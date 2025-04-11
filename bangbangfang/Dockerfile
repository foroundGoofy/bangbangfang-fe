FROM golang:1.22-alpine
# 安装构建依赖（关键修复）
RUN apk add --no-cache git


ENV GOPROXY=https://goproxy.cn,direct \
    GOSUMDB=sum.golang.google.cn

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /bangbangfang

EXPOSE 8080

CMD ["/bangbangfang"]