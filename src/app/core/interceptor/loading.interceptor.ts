// loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingServices } from 'src/app/shared/services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const LoadingService = inject(LoadingServices);

  // Show loading only for non-background requests
  const shouldShowLoading = !req.headers.has('X-Skip-Loading');

  if (shouldShowLoading) {
    LoadingService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (shouldShowLoading) {
        LoadingService.hide();
      }
    })
  );
};