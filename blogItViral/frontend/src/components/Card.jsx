import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function MediaCard(props) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Link to={props.to1}>
        <CardMedia
          sx={{ height: 140 }}
          image="/no-user.png"
          title="green iguana"
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="overflow-hidden h-8"
          >
            <div>{props.title}</div>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.body}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Link to={props.to2}>
          <Button size="small">Open</Button>
        </Link>
        <Link to={props.to3}>
          <Button size="small">Edit</Button>
        </Link>
        <Button size="small" onClick={props.delete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
