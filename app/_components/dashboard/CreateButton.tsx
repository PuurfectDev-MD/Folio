"use client"
import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function CreateButton() {
    return (
        <Link className="cursor-pointer pr-4 flex justify-center" href="/create"><PlusIcon size={46} /></Link>
    )
}