import {Cactus_Classical_Serif} from 'next/font/google'
import {Nunito} from "next/font/google";

export const cactus = Cactus_Classical_Serif({weight: '400', subsets: ['latin']})
/* Para usar en algún lado
* import {cactus} from "@/app/ui/fonts";
* `${cactus.className}`
*/

export const nunito = Nunito({weight: "400", subsets: ['latin']})