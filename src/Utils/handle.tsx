import React from "react";

export default function handle<T>(e: React.ChangeEvent<HTMLInputElement>, set: React.Dispatch<React.SetStateAction<T>>) {

    const { name, value } = e.target
    set((e: T) => ({ ...e, [name]: value }))

}