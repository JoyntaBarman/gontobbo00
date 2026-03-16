import connect from "./lib/db"
//
// export async function register() {
//     await connect()
// }


// src/instrumentation.node.ts
export async function register() {

    if (process.env.NEXT_RUNTIME === 'edge') return
    // dynamically import to avoid early bundling
    const { default: connect } = await import('./lib/db')
    await connect()
}