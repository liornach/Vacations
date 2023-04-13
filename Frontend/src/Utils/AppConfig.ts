class AppConfig {
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public vacationsImagesUrl = "http://localhost:4000/api/vacations/images/";

    public registerUrl = "http://localhost:4000/api/register";
    public loginUrl = "http://localhost:4000/api/login";

}

const appConfig = new AppConfig();

export default appConfig;