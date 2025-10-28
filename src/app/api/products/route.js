import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

//Post Your Data
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  await connectDB();
  const body = await request.json();
  const doc = await Product.find({ productId: body.productId });
  
  if (doc.length > 0) {
    return NextResponse.json({
      success: false,
      error: true,
      message: "Already Exists!",
    });
  }
  // insert doc
  
  const result = await Product.insertOne(body);

  return NextResponse.json({
    success: true,
    error: false,
    message: "Your Product Added",
    result: result,
  });
}

//Get Your Data
export async function GET(request) {
  await connectDB();
  const result = await Product.find();
  
  // return Response.json(result);
  if (result.length > 0) {
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
    message: "Invoice Not Found !",
  });
}

/* 
export async function DELETE(request) {


  const result = await collection.deleteOne({invoiceId});
  
  if (!result) {
    return NextResponse.json({
      success: false,
      error: true,
      message: "Your Invoice Couldn't Be Deleted",
    });
  }
  return NextResponse.json({
    success: true,
    error: false,
    message: "Your Invoice Deleted",
    result: result,
  });
}

export async function PUT(request) {
     let pathName = request.method
   
    return NextNextResponse.json({success: true, data:pathName , name:"Your Put Request"})
}
export async function HEAD(request) {}
 
 
 
 
export async function PATCH(request) {}
 
*/
