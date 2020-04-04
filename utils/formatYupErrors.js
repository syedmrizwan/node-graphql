import {ValidationError} from "yup";
export const formatYupError = (err) => {
    const errors = [];
    err.inner.forEach(e => {
        errors.push({
            path: e.path,
            message: e.message
        })
    });
    return errors;
}