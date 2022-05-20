{
    "targets": [{
        "target_name": "native",
        "sources": [
            "src/main.cc",
        ],
        "include_dirs": [
            "<!(node -p \"require('node-addon-api').include_dir\")"
        ],
        "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        "cflags!": ["-fno-exceptions"],
        "cflags_cc!": ["-fno-exceptions"],
        "xcode_settings": {
            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
            "CLANG_CXX_LIBRARY": "libc++",
            "MACOSX_DEPLOYMENT_TARGET": "10.7"
        },
        "msvs_settings": {
            "VCCLCompilerTool": { "ExceptionHandling": 1}
        },
        "conditions": [
            [
                'OS=="mac"',
                {
                    "cflags+": ["-fvisibility=hidden"],
                    "xcode_settings": {
                        "GCC_SYMBOLS_PRIVATE_EXTERN": "YES", # -fvisibility=hidden
                    },
                    'LDFLAGS': [
                        '-framework IOKit',
                    ],
                    "link_settings": {
                        "libraries": ["/System/Library/Frameworks/Foundation.framework"]
                    },
                }
            ],
            # Platform specific source path lists
            [
                "OS != 'mac'", {
                    "sources!": [
                    ]
                }
            ],
            [
                "OS != 'win'", {
                    "sources!": [
                    ]
                }
            ]
        ],
    },
    {
        "target_name": "action_after_build",
        "type": "none",
        "dependencies": [ "native" ],
        "copies": [
            {
                "files": [ "<(PRODUCT_DIR)/native.node" ],
                "destination": "<!(node -p \"require('process').platform\")-<(target_arch)"
            }
        ]
    }]
}

