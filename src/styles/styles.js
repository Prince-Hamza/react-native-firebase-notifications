import { StyleSheet } from "react-native";

export const Flex = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    justifyRow: {
        start: {
            justifyContent: 'flex-start'
        },
         end: {
            justifyContent: 'flex-end'
        },
        center:{
            justifyContent: 'center'

        }
    },
    justifyCol: {
        start: {
            alignItems: 'flex-start'
        },
        end: {
            alignItems: 'flex-end'
        }
    },

    solidBorder: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1
    },
    dashedBorder: {
        borderStyle: 'dashed',
        borderColor: 'black',
        borderWidth: 1
    }

});