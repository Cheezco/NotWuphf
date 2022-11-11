# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build
WORKDIR /app

# copy everything and build the project
COPY . ./
RUN dotnet restore NotWuphf.Web/*.csproj
RUN dotnet publish NotWuphf.Web/*.csproj -c Release -o out

# build runtime image
FROM cr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64
WORKDIR /app
COPY --from=build-env /app/NotWuphf.Web/out ./
ENTRYPOINT ["dotnet", "NotWuphf.Web.dll"]