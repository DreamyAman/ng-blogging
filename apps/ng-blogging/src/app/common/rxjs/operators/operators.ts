import { Observable, of, switchMap, tap } from "rxjs";

export function startWithTap(callback: CallableFunction) {
  return (source$: Observable<unknown>) =>
    of({}).pipe(
      tap(() => callback()),
      switchMap(() => source$),
    );
}
