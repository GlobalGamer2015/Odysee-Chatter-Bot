!macro preInit
 	SetRegView 64
  		WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\Odysee Chatter Bot"
  		WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\Odysee Chatter Bot"
 	SetRegView 32
  		WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\Odysee Chatter Bot"
  		WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "$LOCALAPPDATA\Odysee Chatter Bot"
!macroend

!macro customInstall
	CreateDirectory "$LOCALAPPDATA\Odysee Chatter Bot User Data"
	CreateDirectory "$LOCALAPPDATA\Odysee Chatter Bot User Data\commands"
	CreateDirectory "$LOCALAPPDATA\Odysee Chatter Bot User Data\chat_history"
	CreateDirectory "$LOCALAPPDATA\Odysee Chatter Bot User Data\log"
!macroend