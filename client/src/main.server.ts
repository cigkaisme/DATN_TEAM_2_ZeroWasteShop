import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app.component';
import { config } from './app/app.config.server';

// SỬA Ở ĐÂY:
// Chỉ định rõ kiểu dữ liệu của 'context' là BootstrapContext
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, config, context);

export default bootstrap;
