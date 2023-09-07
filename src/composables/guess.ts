import type { XtxGuessInstance } from "@/types/components"
import { ref } from "vue"

export const useGuessList = () => {
    const guessRef = ref<XtxGuessInstance>()

    const onScrollToLower = () => {
        guessRef.value?.getMore()
        console.log("触底了....")
    }
    return {
        guessRef,
        onScrollToLower
    }
}