import fs from "fs/promises";
import path from "path";

export async function allProducts() {
    const filePath = path.join(
        process.cwd(),
        "data",
        "products.json"
    );

    const file = await fs.readFile(filePath, "utf-8");

    const data = JSON.parse(file);

    return data;
}
