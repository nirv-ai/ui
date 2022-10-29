"use strict";

import React, { memo, useState, useEffect, useRef } from "react";
import TablePopup from "nirvClient/components/Table/TablePopup";
import { ActionMenu } from "nirvClient/components/ActionMenu";
import { api } from "nirvClient/api";
import { Card } from "nirvClient/components/Cards";

import {
  ActionButton,
  CalendarButton,
  CheckButton,
  MenuButton,
  PowerButton,
  renderActions,
  XButton,
} from "nirvClient/components/Forms";

import { eventScheduler, toggleArrayItem } from "@nirv/utils";

// convert everything to use this shit
const TODOfieldKeyProps = {};

export const PathsTableRowPure = ({
  data,
  index,
  style, // MUST USE for react-window
}) => {
  // track changes via formValue
  const [formValue, setFormValue] = useState(
    () =>
      data.formValues?.[data.items[index]] || {
        name: data.items[index],
        id: data.items[index],
      }
  );

  // if (index === 0) console.log('\n\n wtf is formvalue', formValue);

  // if not tracking changes, do this bitch
  // const formValue = data.formValues?.[data.items[index]] || { name: data.items[imindex], id: data.items[index]}

  const handlePowerToggle = async (e) => {
    const newFormValue = await data.powerToggleCb(e, formValue);

    // console.log('\n\n got handlePowerToggle response', newFormValue);

    // TODO
    // else show popup why we couldnt toggle
    // if (newFormValue) setFormValue(newFormValue);
  };

  const closePathsform = async (e, activityData = {}) => {
    if (e?.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }

    // if are a closing this rows form
    const isClosing = formValue.id === data.activeIndex;
    // then send data to potentiialy persist
    const useData = !isClosing ? null : { ...formValue, ...activityData };

    // pass formValue to persist trackedChanges (if any)
    // when closing form
    data.setActiveIndex(e, useData);
  };

  const getMenuButtonContent = () => {
    return <div>{formValue.id}</div>;
  };

  // use the current active icon+index to render content
  const isActive = data.activeIndex == formValue.id;
  const getTooltipContent = () => {
    if (!isActive) return null;

    const notImplemented = () =>
      console.log("\n\n not implemented", data.activeIcon);
    switch (data.activeIcon) {
      case "1":
        return getMenuButtonContent();
      case "3":
        return notImplemented();
      default:
        return null;
    }
  };

  const isPlayerPath = formValue.playerIds?.includes(
    data.playerState?.player?.id
  );
  const actionIcons = [
    {
      // toggle on/off
      className: isPlayerPath ? "on" : "off",
      disabled: !data.canEdit,
      Icon: PowerButton,
      onClick: handlePowerToggle,
      "data-type": isPlayerPath ? "leavePath" : "joinPath",
      "data-pathid": formValue.id,
    },

    {
      // render action menu in tooltip on click
      // figure out what we want menu button
      // should be to configure the activity, whereas the old config will be used to configure calendar events
      disabled: !data.canEdit,
      Icon: MenuButton,
      onClick: closePathsform,
    },
  ];

  const chatConfig = { domainId: "paths", subDomainId: formValue.id };

  return (
    <div key={formValue.id} className="record" style={style}>
      <ActionMenu
        activeIcon={data.activeIcon}
        activeIndex={data.activeIndex}
        actionIcons={actionIcons}
        chatConfig={chatConfig}
        formValue={formValue}
        index={index}
        isActive={isActive}
        playerActions={data.playerActions}
        tooltipContent={getTooltipContent()}
      />
    </div>
  );
};

const areEqual = (pp, np) => {
  return false;
};

export const PathsTableRow = React.memo(PathsTableRowPure, areEqual);
