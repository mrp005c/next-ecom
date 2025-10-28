import { NextRequest, NextResponse } from "next/server";

import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";


export async function GETs(request, { params }) {
  // const { productId } = await params;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("productId");
  
  const oj = {
    success: true,
    "User ID": id,
    error: false,
    result: {
      name: "Anti-Glare Laptop Screen Protector",
      price: 1,
      category: "Accessories",
      rating: 4.3,
      inStock: true,
      productId: "293234f",
      createdAt: "2025-10-26T16:06:24.948Z",
      updatedAt: "2025-10-26T16:06:24.948Z",
      __v: 0,
    },
  };
  // Use the 'id' parameter here
  return NextResponse.json(oj);
}



//Get Your Data
export async function GET(request) {
   const { searchParams } = new URL(request.url);
  const id = searchParams.get("productId");
  await connectDB();
  const result = await Product.findById(id)
 
  // return Response.json(result);
  if (result) {
    return NextResponse.json({
      success: true,
      error: false,
      result: result,
      message: "Products Found",
    });
  }
  return NextResponse.json({
    success: false,
    error: true,
    message: "Product Not Found !",
  });
}
