import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { ToastContainerComponent } from "./toast-container/toast-container.component";

const TOAST_CONTAINER_CLASS_NAME = "toast-container";

@Injectable()
export class ToastContainerService implements OnDestroy {
  private renderer: Renderer2;
  private containerEl: HTMLElement;
  private componentRef: ComponentRef<ToastContainerComponent>;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: any,
    private factoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get ref(): ComponentRef<ToastContainerComponent> {
    if (!this.componentRef) {
      this._attach();
    }
    return this.componentRef;
  }

  private get containerElement(): HTMLElement {
    if (!this.containerEl) {
      this.containerEl = this.renderer.createElement("div");
      this.renderer.addClass(this.containerEl, TOAST_CONTAINER_CLASS_NAME);
      this.renderer.appendChild(this.document.body, this.containerEl);
    }
    return this.containerEl;
  }

  ngOnDestroy() {
    this._detach();
    this._destroyContainer();
  }

  private _attach() {
    this._detach();
    const componentFactory = this.factoryResolver.resolveComponentFactory(
      ToastContainerComponent,
    );
    this.componentRef = componentFactory.create(this.injector);
    const hostView = this.componentRef.hostView as EmbeddedViewRef<any>;
    this.appRef.attachView(hostView);
    const rootNode = hostView.rootNodes[0] as HTMLElement;
    this.renderer.appendChild(this.containerElement, rootNode);
  }

  private _detach() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private _destroyContainer() {
    if (this.containerEl && this.containerEl.parentNode) {
      this.renderer.removeChild(this.containerEl.parentNode, this.containerEl);
      this.containerEl = null;
    }
  }
}
