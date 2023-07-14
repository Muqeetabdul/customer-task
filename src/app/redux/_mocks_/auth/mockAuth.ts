import MockAdapter from "axios-mock-adapter";

export default function mockAuth(mock: MockAdapter) {
  mock.onPost("api/auth/login").reply((data: any) => {
    const requestData = JSON.parse(data.data);
    const loginRequest = requestData.loginRequest;
    if (!loginRequest || !loginRequest.email || !loginRequest.password) {
      return [400, { error: "The login details are incorrect" }];
    }
    if (loginRequest.email === "admin@demo.com" && loginRequest.password === "demo") {
      return [200, { id: 1, email: loginRequest.email, token: "USER_LOGGED_IN", username: "Jhon Doe" }];
    } else {
      return [401, { error: "The login details are incorrect" }];
    }
  });
  mock.onGet("api/who-am-i").reply((config) => {
    if(config && config.headers){
      const Authorization = config.headers.Authorization;
      const accessToken = Authorization && Authorization.toString().startsWith("Bearer ") && Authorization.toString().slice("Bearer ".length);
      if (accessToken) {
        return [200, { id: 1, email: "admin@test.com", username: "Jhon Doe" }];
      } else {
        return [401,{error : "Invalid token"}];
      }
    }else{
      return [500,{error:"An unknow error occured"}]
    }
  });
}
