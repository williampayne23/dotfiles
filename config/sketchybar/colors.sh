

export WHITE=0xFFFFFFFFF

with_alpha(){
    echo $2 | sed s/0xFF/0x$1/
}

# -- Teal Scheme --
# export BAR_COLOR=0xff001f30 
# export ITEM_BG_COLOR=0xff003547
# export ACCENT_COLOR=0xff2cf9ed

# -- Gray Scheme --
export BACKGROUND=0xFF101314
export BAR_COLOR=$(with_alpha 55 $BACKGROUND)
export ITEM_BG=$(with_alpha 55 $BACKGROUND)
export ITEM_FG=0x99ffffff
export ITEM_ACCENT=0xffffffff

# -- Purple Scheme --
# export BAR_COLOR=0xff140c42
# export ITEM_BG_COLOR=0xff2b1c84
# export ACCENT_COLOR=0xffeb46f9

# -- Red Scheme ---
# export BAR_COLOR=0xff23090e
# export ITEM_BG_COLOR=0xff591221
# export ACCENT_COLOR=0xffff2453

# -- Blue Scheme --- 
# export BAR_COLOR=0xff021254
# export ITEM_BG_COLOR=0xff093aa8
# export ACCENT_COLOR=0xff15bdf9

# -- Green Scheme --
# export BAR_COLOR=0xff003315
# export ITEM_BG_COLOR=0xff008c39
# export ACCENT_COLOR=0xff1dfca1


# -- Orange Scheme --
# export BAR_COLOR=0xff381c02
# export ITEM_BG_COLOR=0xff99440a
# export ACCENT_COLOR=0xfff97716

# -- Yellow Scheme --
# export BAR_COLOR=0xff2d2b02
# export ITEM_BG_COLOR=0xff8e7e0a
# export ACCENT_COLOR=0xfff7fc17
