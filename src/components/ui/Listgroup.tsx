import type { ICounts } from "@/interfaces";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { memo } from "react";
import ProtectedElement from "./ProtectedElement";

interface IProps {
  title: string;
  data: Array<ICounts>;
  end_time: string;
}

function Listgroup({ title, data, end_time }: IProps): React.ReactNode {
  return (
    <>
      <ProtectedElement isAllowed={data.length > 0}>
        <Typography variant="body2" gutterBottom>
          {title}
        </Typography>
      </ProtectedElement>

      {data.map(({ category_name, counts }) => (
        <ListItem
          key={crypto.randomUUID()}
          secondaryAction={<IconButton edge="end">{counts}</IconButton>}
        >
          <ListItemAvatar>
            <Avatar src={"/rsystfip_logotype.svg"} alt="RSystfip logotype" />
          </ListItemAvatar>

          <ListItemText
            primary={category_name}
            secondary={format(parseISO(end_time), "MMM d, yyyy", {
              locale: es,
            })}
          />
        </ListItem>
      ))}
    </>
  );
}

export default memo(Listgroup);
