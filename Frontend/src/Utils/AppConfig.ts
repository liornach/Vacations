class AppConfig {
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public singleVacationUrl = "http://localhost:4000/api/single-vacation/"
    public vacationsImagesUrl = "http://localhost:4000/api/vacations/images/";

    public registerUrl = "http://localhost:4000/api/register";
    public loginUrl = "http://localhost:4000/api/login";

    public followUrl = "http://localhost:4000/api/vacations/follow/";
    public unFollowUrl = "http://localhost:4000/api/vacations/unfollow/";

    public imageUrl = "http://localhost:4000/api/vacations/images/"
}

const appConfig = new AppConfig();

export default appConfig;