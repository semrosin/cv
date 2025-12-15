import { app } from "./app";
import "./db";
import { ENV } from "./env";

app.listen(ENV.PORT, () => {
    console.log(`Server running on http://localhost:${ENV.PORT}`);
});
