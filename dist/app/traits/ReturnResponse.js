"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnResponse {
    success(type, data = null, message = null, code = 200) {
        let response_status;
        if (!message) {
            message = "Successfully Work!";
        }
        if (type) {
            let typeResponses = {
                "created": {
                    "response_status": "successfully-created",
                    "message": "Data successfully created!",
                    "code": 201
                },
                "updated": {
                    "response_status": "successfully-updated",
                    "message": "Data successfully updated!",
                    "code": 201
                },
                "deleted": {
                    "response_status": "successfully-deleted",
                    "message": "Data successfully deleted!",
                    "code": 200
                },
                "uploaded": {
                    "response_status": "successfully-uploaded",
                    "message": "Data successfully uploaded!",
                    "code": 200
                },
                "downloaded": {
                    "response_status": "successfully-downloaded",
                    "message": "Data successfully downloaded!",
                    "code": 200
                },
                "searched": {
                    "response_status": "successfully-searched",
                    "message": "Data successfully searched!",
                    "code": 200
                },
                "get": {
                    "response_status": "successfully-get",
                    "message": "Data successfully get!",
                    "code": 200
                }
            };
            let typeResponsesObj = typeResponses[type];
            code = typeResponsesObj.code;
            message = typeResponsesObj.message;
            response_status = typeResponsesObj.response_status;
        }
        else {
            response_status = 'success';
        }
        let response;
        if (data) {
            response = {
                response_code: code,
                response_status,
                message,
                data
            };
        }
        else {
            response = {
                response_code: code,
                response_status,
                message
            };
        }
        return response;
    }
    errorServer(data = null, message = null, code = 400) {
        if (!message) {
            message = "Internal Server Error";
        }
        let response;
        if (data) {
            response = {
                response_code: code,
                response_status: 'error_server',
                message,
                errors: data
            };
        }
        else {
            response = {
                response_code: code,
                response_status: 'error_server',
                message
            };
        }
        return response;
    }
    errorValidation(data = null, message = null, code = 422) {
        if (!message) {
            message = "Validation Error";
        }
        let response;
        if (data) {
            response = {
                response_code: code,
                response_status: 'error_validation',
                message,
                errors: data
            };
        }
        else {
            response = {
                response_code: code,
                response_status: 'error_validation',
                message
            };
        }
        return response;
    }
}
exports.default = new ReturnResponse();
//# sourceMappingURL=ReturnResponse.js.map