export function getErrorMessage(err) {
    switch(err.name) {
        case "ValidationError": {
            const errors = Object.values(err.errors);
            return errors.length ? errors[0].message : err.message;
        }
        default:
            return err.message;
    }
}