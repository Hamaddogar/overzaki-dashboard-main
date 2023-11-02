import { NextRequest, NextResponse } from "next/server";
import { connect } from "src/utils/dbconfig/dbconfig";
import SettingConfigs from 'src/utils/models/configModel';

connect()


export async function POST(request: NextRequest) {

    // await connect();
    try {
        const reqBody = await request.json()
        const { add, data } = reqBody;

        // add config
        if (add) {
            const newSettings = new SettingConfigs(data); // Save data directly in the 'config' field
            await newSettings.save();

            // Create a response based on the query 
            const response = NextResponse.json({
                success: true,
                data,
                newSettings,
                link: `https://ecom-zaki.vercel.app/?config=${newSettings._id}`,
            });

            return response;
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



