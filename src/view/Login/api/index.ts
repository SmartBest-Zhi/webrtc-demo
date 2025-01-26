import request from "../../../utils/request";

export const register = (data: object) => {
    return request({
      url: "/user/register",
      method: "post",
      data,
    });
};

export const loginByUsername = (data: object) => {
return request({
    url: "/user/login",
    method: "post",
    data,
});
};
