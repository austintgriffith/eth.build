import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";
import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(85, 85, 85, 0.8)"
  }
}));

export default function FilesList({ files, onClick }) {
  const classes = useStyles();
  console.log(files);
  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        {/* <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
          <ListSubheader component="div">My eth.build files</ListSubheader>
        </GridListTile> */}
        {files.map(file => (
          <GridListTile
            key={file.fileName}
            style={{ cursor: "pointer" }}
            onClick={() => (onClick ? onClick(file) : null)}
          >
            <img src={file.screenshot} alt={file.fileName} />
            <GridListTileBar
              title={file.fileName}
              subtitle={<span>modified {file.timestampStr}</span>}
              // actionIcon={
              //   <IconButton
              //     aria-label={`info about ${file.fileName}`}
              //     className={classes.icon}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
              style={{ background: "rgba(255, 255, 255, 0.2)" }}
            />
          </GridListTile>
        ))}
        {files.length === 0 && (
          <Typography
            variant="caption"
            align="center"
            style={{ margin: "auto", marginTop: 32 }}
          >
            No files available
          </Typography>
        )}
      </GridList>
    </div>
  );
}
