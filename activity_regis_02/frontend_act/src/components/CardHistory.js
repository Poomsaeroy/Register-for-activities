import { Avatar, Box, Button, Card, CardContent, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import config from "../config";

function CardHistory(props) {

    const image_url = `${config.serverUrlPrefix}${props.cardDetail.acti_image}`

  return (
    <div>
      <Card
        sx={{
          minHeight: 80,
          minWidth: 40,
          pt: 1.5,
          mt: 1.5,
          mb: 1.5,
          mr: 1.5,
          ml: 1.5,
        }}
      >
        <CardContent
          sx={{ height: "20px", width: "5" }}
          style={{ backgroundColor: "#fabca4" }}
        >
          <div>
            <Stack direction="row" spacing={2}>
              <Avatar src={image_url}/>
              <Box>
                <Button component={Link} to="/history/" sx={{ mx: "auto" }}>
                  {props.cardDetail.topic}
                </Button>
              </Box>
            </Stack>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardHistory;
