ifeq ($(OS), Windows_NT)
	PLATFORM = Windows
else
	ifeq ($(shell uname -s), Darwin)
		PLATFORM = Apple
	else
		PLATFORM = Linux
	endif
endif

test:
ifeq ($(PLATFORM), Windows)
	powershell "echo windows"
else
	echo hello
endif

