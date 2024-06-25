import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],  // Установите нужные уровни логирования
    });
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()