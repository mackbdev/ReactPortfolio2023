import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { data, handleDragEnd } from "./logic";

const ItemsList = ({ itemData }) => {
  /* pass data as prop instead
  const itemData = [
    {
      id: 0,
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
    },
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
    }
  ];
  */

  return (
    <div>
      <Container maxWidth="sm">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data &&
                  data.map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Paper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            elevation={2}
                            sx={{ marginBottom: "10px" }}
                          >
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar src={item.img} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={item.title}
                                secondary={`Author: ${item.author}`}
                              />
                            </ListItem>
                          </Paper>
                        )}
                      </Draggable>
                    );
                  })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </div>
  );
};

export default ItemsList;
