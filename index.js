import express from"express"; 
import cors from"cors";
import ProvinceRouter from"./src/controllers/provinces_controller.js"
import EventRouter from "./src/controllers/events_controller.js"
import UserRouter from "./src/controllers/users_controller.js"
import LocationRouter from "./src/controllers/locations_controller.js";
import events_categories from "./src/controllers/event-categories_controller.js";
import events_locations from "./src/controllers/event-locations_controller.js";
const app =express(); 
const port=3000; 
app.use(cors()); 
app.use(express.json());

app.use("/api/province",ProvinceRouter); 
app.use("/api/event",EventRouter);
app.use("/api/user",UserRouter);
app.use("/api/location",LocationRouter);
app.use("/api/event-categories", events_categories);
app.use("/api/evet-locations",events_locations);

app.listen(port,()=>{ console.log(`Exampleapplisteningonport${port}`)}) 