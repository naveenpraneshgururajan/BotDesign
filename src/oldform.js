<form className="chatbot-input-form" onSubmit={handleSubmit}>
            <Box
              sx={{
                width: 700,
                maxWidth: "100%",
                boxShadow: "#024731",
              }}
            >
              <TextField
                fullWidth
                hiddenLabel
                id="outlined"
                variant="outlined"
                placeholder="Type your querry..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                inputRef={inputRef}
                InputProps={{
                  style: { color: "#024731" },
                }}
              />
            </Box>

            {/* <Button
              onClick={handleSubmit}
              variant="contained"
              style={{ background: "#024731", paddingRight: 5, width: "35%" }}
              endIcon={<SendIcon style={{paddingRight:10}}/>}
            >
              Send
            </Button> */}
            <IconButton
              onClick={handleSubmit}
              style={{
                background: "#024731",
                width: 55,
                height: 60,
                borderRadius: "50%",
                padding: 0,
              }}
            >
              <SendIcon style={{ color: "#fff", fontSize: 30 }} />
            </IconButton>
          </form>