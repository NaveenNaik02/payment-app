import { model, Model, modelAction, tProp, types } from "mobx-keystone"

@model("app/CounterModel")
export class Counter extends Model({
    count: tProp(types.number, 0)
}) {
    @modelAction
    increment() {
        this.count += 1
    }
}