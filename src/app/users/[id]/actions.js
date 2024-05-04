"use server";
import validation from "@/data/validation.js";
import { userData } from '@/data';

export async function getUserIdAction(id) {
    var result = {
        error: false,
        errorMess: "",
        user: undefined,
    }
    try {
        validation.checkId(id)
    }
    catch (e) {
        result.error = true
        result.errorMess = "Error 400: Invalid ID entered"
    }
    if (!result.error) {
        try {
            let resultUser = await userData.getUserById(id)
            result.user = resultUser
        }
        catch (e) {
            console.log("threw error")
            console.log(e)
            result.error = true
            result.errorMess = "Error 404: User not found"
        }
    }
    return JSON.parse(JSON.stringify(result))
}