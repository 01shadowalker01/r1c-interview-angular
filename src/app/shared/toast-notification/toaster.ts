import { Inject, Injectable, Type } from "@angular/core";
import { ToastConfig } from "./toast.config";
import { ToastContainerService } from "./toast-container.service";
import {
  TOAST_NOTIFICATIONS_CONFIG,
  ToastNotificationsConfig,
} from "./toast-notifications.config";
import { BasicToastContentComponent } from "./toast-content/basic-toast-content.component";
import { Toast } from "./toast";

const DEFAULT_CONFIG: ToastConfig = {
  autoClose: true,
  duration: 8000,
  type: "light",
  position: "top-right",
  direction: "rtl",
  component: BasicToastContentComponent,
};

@Injectable({
  providedIn: "root",
})
export class Toaster {
  constructor(
    @Inject(TOAST_NOTIFICATIONS_CONFIG)
    private config: ToastNotificationsConfig,
    private containerService: ToastContainerService,
  ) {}

  open(config: ToastConfig): Toast | null;
  open(text: string, config?: ToastConfig): Toast | null;
  open(component: Type<any>, config?: ToastConfig): Toast | null;
  open(
    config: ToastConfig | string | Type<any>,
    componentConfig?: ToastConfig,
  ): Toast | null {
    if (typeof config === "string") {
      config = { text: config as string, ...componentConfig };
    }
    if (config instanceof Type) {
      config = { ...componentConfig, component: config as Type<any> };
    }
    config = { ...DEFAULT_CONFIG, ...this.config, ...config };
    return this.containerService.ref.instance.add(config);
  }
}
