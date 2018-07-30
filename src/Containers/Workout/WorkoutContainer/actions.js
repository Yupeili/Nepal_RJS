// @flow
export function keepWarmUp (value: number) {
  return {
    type: "KEEP_WARMUP",
    payload: value
  }
}

export function keepWorkOut (value: number) {

  return {
    type: "KEEP_WORKOUT",
    payload: value
  }
}
export function updateExercise (previousValue, value) {

  return {
    type: "UPDATE_EXERCISE",
    payload: [previousValue, value]
  }
}
export function updateWarmup (previousValue, value) {
  return {
    type: "UPDATE_WARMUP",
    payload: [previousValue, value]
  }
}
