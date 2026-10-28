import { Observable, of, switchMap, tap } from "rxjs";

export function startWithTap<T>(callback: CallableFunction) {
  return (source$: Observable<T>) =>
    of({}).pipe(
      tap(() => callback()),
      switchMap(() => source$),
    );
}
