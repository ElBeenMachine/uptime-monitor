/**
 * @author - @ElBeenMachine
 */

import { NextApiRequest, NextApiResponse } from "next";
import process from "process";

/**
 * Function to get the system uptime.
 *
 * @param {NextApiRequest} req - The request object
 * @param {NextApiResponse} res - The response object
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({
        uptime: process.uptime(),
    });
}
