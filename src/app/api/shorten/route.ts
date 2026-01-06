import { urlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { originalUrl } = await req.json();
    const shortenerService = new urlShortenerService();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    return NextResponse.json({ shortUrl }, { status: 201 });
}

export async function GET(req: Request) {
    const shortenerService = new urlShortenerService();
    const urls = await shortenerService.getAllUrls();
    return NextResponse.json({ urls }, { status: 200 });
}