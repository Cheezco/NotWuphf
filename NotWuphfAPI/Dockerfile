# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /

# copy csproj and restore as distinct layers

# copy everything else and build app
COPY . .
RUN dotnet restore NotWuphfAPI.Web/NotWuphfAPI.Web.csproj -r linux-musl-x64
RUN dotnet publish -c Release NotWuphfAPI.Web/NotWuphfAPI.Web.csproj -o /app -r linux-musl-x64 --self-contained false --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-amd64
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["./NotWuphfAPI.Web"]

# See: https://github.com/dotnet/announcements/issues/20
# Uncomment to enable globalization APIs (or delete)
# ENV \
#     DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
#     LC_ALL=en_US.UTF-8 \
#     LANG=en_US.UTF-8
# RUN apk add --no-cache \
#     icu-data-full \
#     icu-libs