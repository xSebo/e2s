# https://learn.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-7.0  @ 20/11/2022

# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY Tests/*.csproj ./Tests/
COPY WebApplication2/*.csproj ./WebApplication2/
RUN dotnet restore

# copy everything else and build app
COPY WebApplication2/. ./WebApplication2/
COPY Tests/. ./Tests/
WORKDIR /source/WebApplication2
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./
EXPOSE 80
ENTRYPOINT ["dotnet", "WebApplication2.dll"]
